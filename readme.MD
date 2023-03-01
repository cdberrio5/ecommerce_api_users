#Create the image with node
docker build . -t users

#Starts the container with the API image
docker run -p 4000:4000 -d users

#After that the app runs on the port 4000. To check it: 
docker ps #Copy the container id

docker logs <container-id>