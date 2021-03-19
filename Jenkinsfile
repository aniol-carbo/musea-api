pipeline {
  agent any
  environment {
        CI = 'true'
        UNSUCCESSFUL_STAGE = 'null' 
    }
  stages {
    stage('Build') {
       agent {
          docker {
            image 'node:10-alpine'
          }
      }
      steps {
         echo 'Starting building test docker image'
         sh 'npm install'
         
      }
      post {
        success {
          echo 'Image successfully build'
        }
        failure {
          echo 'Failed to build image'
          script {
                        UNSUCCESSFUL_STAGE = env.STAGE_NAME
            }
        }
      }
    }
    stage('Test') {
      environment {
          DATABASE_URL='mongodb+srv://admin:admin@museadb.091dp.mongodb.net/museaDB?retryWrites=true&w=majority'
          TEST_DATABASE_URL='mongodb+srv://admin:admin@museadb.091dp.mongodb.net/testMusea?retryWrites=true&w=majority'
          MODE='dev'           }
      agent {
        docker {
          image 'node:10-alpine'
          args '-e DATABASE_URL'
        }
      }
      steps {
        echo 'Starting API tests'
        sh 'npm test'
      }
      post {
        success {
                    echo 'Tests succesfully executed'
                }
        unstable {
            echo 'One or more tests failed'
            echo 'Build marked as unstable'
        }
        failure {
            echo 'Test execution failed'
        }
        unsuccessful {
            script {
                UNSUCCESSFUL_STAGE = env.STAGE_NAME
            }
        }
      }
    }
    stage('Sonarqube') {
      agent {
        docker {
          image 'sonarsource/sonar-scanner-cli' 
        }
      }
        environment {
            scannerHome = tool 'SonarQubeScanner'
        }
        steps {
           
            withSonarQubeEnv('sonarqube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
           
        }
        post {
                failure {
                    echo 'SonarQube analysis failed'
                    script {
                        UNSUCCESSFUL_STAGE = env.STAGE_NAME
                    }
                }
            }
    }
     stage('Quality Gate') {
            steps {
              script {
                timeout(time: 1, unit: 'HOURS') {
                       def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            currentBuild.result = 'UNSTABLE'
                        }  
                }
              }
            }
       post {
                success {
                    echo 'SonarQube quality gate passed'
                }
                unstable {
                    echo 'SonarQube quality gate failed'
                    echo 'Build marked as unstable'
                    script {
                        if (UNSUCCESSFUL_STAGE == 'null') {
                            UNSUCCESSFUL_STAGE = env.STAGE_NAME
                        }                        
                    }
                }
                failure {
                    echo 'Quality gate not received'
                    script {
                        UNSUCCESSFUL_STAGE = env.STAGE_NAME
                    }
                }
            }
           
        }
    stage('Deploy') {
        when {
                  expression {
                      currentBuild.result == null || currentBuild.result == 'SUCCESS'
                  }
              }
        parallel {
          stage('Stage') {
            when {
              expression {
                env.GIT_BRANCH == 'origin/develop'
              }
            }
            steps {
                echo 'deploy to development' 
                sh 'cat ~/.netrc'
                sh 'curl https://cli-assets.heroku.com/install.sh | sh'
                sh 'heroku login'
                sh 'git push heroku master'
            }
          }
          stage('Prod') {
            when {
              expression {
                env.GIT_BRANCH == 'origin/master'
              }
            }
            steps {
            echo 'deploy to master' 
            }
          }
        }
    }
  }
   post {
        success {
            script {
                
                    def msg = commitInfo() + "\nCongratulations, your commit works!\nAnd it's already **deployed**!"
                    def img = 'https://animal.mx/wp-content/uploads/2020/08/leonardo-dicaprio-memes-django-.jpg'
                    notifyDiscord(msg, img)
                
            }
        }
        unstable {
            script {
                def msg = commitInfo() + '\n'
                if (UNSUCCESSFUL_STAGE == 'Test') {
                    msg = msg + "Lol, it didn't even pass the tests..."
                } else if (UNSUCCESSFUL_STAGE == 'Quality Gate') {
                    msg = msg + "I'm sorry, sonarqube didn't like your commit..."
                }
                img = 'https://i.kym-cdn.com/entries/icons/original/000/027/995/crying.jpg'
                notifyDiscord(msg, img)
            }
        }
        failure {
            script {
                def msg = commitInfo() + "\nIt seems something went wrong at stage ${UNSUCCESSFUL_STAGE}"
                img = 'https://www.dictionary.com/e/wp-content/uploads/2018/03/This-is-Fine-300x300.jpg'
                notifyDiscord(msg, img)
            }
        }
    }
}

def commitInfo() {
    def msg = sh(
        script: 'git --no-pager show -s --format="[%an] **%s**"',
        returnStdout: true
    )
    return msg
}

def notifyDiscord(String msg, String img) {
    msg = msg + "\n\n[SonarQube](http://10.4.41.141:9000/dashboard?id=my%3AAPIMUSEA)"
        discordSend(
            webhookURL: "https://discord.com/api/webhooks/821385850637647974/ibFTmFlOpWGNQNZYo9K7T_wDr82k_3VS2w99iQQ7a1aSS1CWHuGBvta6qmbvBZMmBetC",
            title: "${currentBuild.currentResult} in ${env.JOB_NAME}",
            link: env.BUILD_URL,
            result: currentBuild.result,
            image: img,
            description: msg
        )
    
}
