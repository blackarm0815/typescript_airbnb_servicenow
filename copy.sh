# make directories
mkdir $1/client
mkdir $1/server

# copy files
cp client/build_client.sh $1/client
cp client/client.ts $1/client
cp client/.eslintrc.json $1/client
cp client/tsconfig.json $1/client
cp package.json $1
cp server/build_server.sh $1/server
cp server/.eslintrc.json $1/server
cp server/server.ts $1/server
cp server/tsconfig.json $1/server
cp widget.css $1
cp widget.html $1
