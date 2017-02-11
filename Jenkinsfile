node {
  checkout scm
  sh 'git rev-parse HEAD > git_commit_id.txt'
  try {
    env.GIT_COMMIT_ID = readFile('git_commit_id.txt').trim()
  } catch (e) {
    error "${e}"
  }
  println "env.GIT_COMMIT_ID ==> ${env.GIT_COMMIT_ID}"
  sh "docker build -t splitguru-frontend-nuxt:${env.GIT_COMMIT_ID} ."
  sh "docker tag splitguru-frontend-nuxt:${env.GIT_COMMIT_ID} gcr.io/splitguru-154114/splitguru-frontend-nuxt"
  withCredentials([file(credentialsId: 'gcloud-service-json-key', variable: 'GCLOUD_SERVICE_KEY')]) {
    sh "gcloud auth activate-service-account --key-file ${GCLOUD_SERVICE_KEY} && gcloud docker -- push gcr.io/splitguru-154114/splitguru-frontend-nuxt"
  }
}
