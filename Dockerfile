FROM node:18-alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD nodemon -L start
# docker build -t testimage:<ΟΤΙΘΕΣ> . MH ΞΕΧΑΣΕΙΣ ΤΗ ΤΕΛΕΙΑ (Για να φιαχτεί το image με customtag. Το γραφεις χωρις τις παρενθεσεις)
# docker images (Για να δω τα υπάρχοντα images)
# docker images rm testimage (διαγράφει το testimage)
# docker run --name testcontainer -p 3000:3000 -d testimage (Για να δω τα υπάρχοντα images. testimage ειναι το ονομα του image που εφιαξα πριν. testcontainer ειναι το ονομα του container που προκειται να φιαχτει. Το αριστερα 3000 ειναι το πορτ του hostpc. Το δεξιά 3000 είναι το πορτ του container αυτό δλδ που κάνει export)
# docker ps -a (δειχνει όλα τα containers)
# docker container rm testcontainer (διαγράφει το testcontainer)
# docker stop testcontainer (σταματάει το container testcontainer)