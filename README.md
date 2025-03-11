## READ-ME

Hello! My name is Rebecca Eskekärr and am the developer for this project!

This is at the moment a small at-home-project but also a part of my portfolio.

To explain further, this project is at the very start of the devolopment-timeline
where I try to navigate how to work around backend-frontend aswell as connection to 
the various databases and the integration in between while also keeping functionality
and a sense of user-friendly design in the frontend.

If you have any further questions or want to contact me, 
my email is: rebecca@eskekarr.se

Hope you have a good day! :)




## For development - should solve problems (test them all)

1. Add node install, npm install, npm install -g npx
2. npm install react-scripts
3. npm install react-dom, npm install web-vitals

Always good
4. npm update, npm install, npm -v <--(to see that it is installed)
5. npm install @material-ui/core --legacy-peer-deps

#For all installations, ex npm install, add "--legacy-peer-deps"


If there is problem with updating the code in the backend:
1. try npm cache clean --force and see if it works
2. if not- remove the whole folder of the node_modules in backend
3. then in bash: rm -rf node_modules package-lock.json
4. npm install --legacy-peer-deps
5. npx prisma generate
6. restart the backend 

