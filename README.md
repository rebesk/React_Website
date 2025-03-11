## READ-ME
## Get started - should solve problems (test them all)

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

