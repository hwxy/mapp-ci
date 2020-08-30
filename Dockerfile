#指定基础镜像
FROM node:10-alpine 

#USER root
ENV BASE_DIR=/root/app

# 在构建镜像时，指定镜像的工作目录，之后的命令都是基于此工作目录，如果不存在，则会创建目录
WORKDIR $BASE_DIR

RUN npm config set registry https://registry.npm.taobao.org

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm i
# Copy Files
COPY src/ ./src

# 暴露端口镜像作为映射
EXPOSE 4000

VOLUME ["/root/app/logs"]

# 运行命令
CMD ["npm","run","build:prod"]
