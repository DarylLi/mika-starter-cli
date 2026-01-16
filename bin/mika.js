#!/usr/bin/env node

const args = process.argv.slice(2);

const download = require('download-git-repo');
const handlebars = require('handlebars');
const { program } = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');

const templates = {
  'mika-webpack' : {
    url: 'https://github.com/DarylLi/react-webpack-mika',
    downloadUrl: 'http://github.com:DarylLi/react-webpack-mika#main',
	// downloadUrl:'https://mygitlab.com:flippidippi/download-git-repo-fixture#my-branch',
    description: 'react-webpack-mika模板'
  },
  'mika-rspack' : {
    url: 'https://github.com/DarylLi/react-rspack-mika',
    downloadUrl: 'http://github.com:DarylLi/react-rspack-mika#main',
  	// downloadUrl:'https://mygitlab.com:flippidippi/download-git-repo-fixture#my-branch',
    description: 'react-rspack-mika模板'
  },
  'mika-ssr' : {
    url: 'https://github.com/DarylLi/vue3-ssr-template',
    downloadUrl: 'http://github.com:DarylLi/vue3-ssr-template#main',
  	// downloadUrl:'https://mygitlab.com:flippidippi/download-git-repo-fixture#my-branch',
    description: 'vue ssr 模板'
  },
  'vue': {
    url: 'https://github.com/vincentzyc/vue3-demo',
    downloadUrl: 'http://github.com:vincentzyc/vue3-demo#main',
    description: 'Vue3 官方脚手架模板'
  },
  'nuxt': {
    url: 'https://github.com/JsonLYH/nuxt4-learn-demo',
    downloadUrl: 'http://github.com:JsonLYH/nuxt4-learn-demo#master',
    description: 'Nuxt3 全栈框架模板'
  },
  'next': {
    url: 'https://github.com/akiran/nextjs-demo',
    downloadUrl: 'http://github.com:akiran/nextjs-demo#master',
    description: 'Next.js React 全栈框架模板'
  },
  'nest': {
    url: 'https://github.com/nestjs/typescript-starter',
    downloadUrl: 'http://github.com:nestjs/typescript-starter#master',
    description: 'NestJS TypeScript 后端框架模板'
  },
  'rsbuild': {
	  url: 'https://github.com/DarylLi/mika-rsbuild-vue',
    downloadUrl: 'http://github.com:DarylLi/mika-rsbuild-vue#main',
    description: 'Rsbuild vue3 构建工具模板'
  },
  'esbuild': {
    url: 'https://github.com/ws18250840411/esbuild-react-demo',
    downloadUrl: 'http://github.com:ws18250840411/esbuild-react-demo#main',
    description: 'ESBuild 快速构建模板'
  },
  'swc':{
	url: 'https://github.com/LukeGeneva/swc-react-template',
    downloadUrl: 'http://github.com:LukeGeneva/swc-react-template#master',
    description: 'Template for a React App powered by SWC (speedy web compiler).'
  }
};

program.version('1.0.6') // -v 或者 --version 输出版本号

program
  .command('init <template> <project>')
  .description('初始化项目模板')
  .action((templateName, projectName) => {
    // 检查模板是否存在
    if (!templates[templateName]) {
      console.log(logSymbols.error, chalk.red(`模板 "${templateName}" 不存在！`));
      console.log(chalk.yellow('请使用 mika list 查看可用模板'));
      return;
    }

    const spinner = ora('正在下载模板...').start();
    const { downloadUrl } = templates[templateName];

    // 下载模板
    download(downloadUrl, projectName, { clone: false }, (err) => {
      if (err) {
        spinner.fail();
        console.log(logSymbols.error, chalk.red('下载失败：'), err.message);
        console.log(chalk.yellow('提示：请检查网络连接或模板地址是否正确'));
      } else {
        spinner.succeed(chalk.green('模板下载成功！'));
        
        // 询问项目信息
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: '请输入项目名称：',
            default: projectName
          },
          {
            type: 'input',
            name: 'description',
            message: '请输入项目描述：',
            default: 'A project created by mika-cli'
          },
          {
            type: 'input',
            name: 'author',
            message: '请输入作者名称：',
            default: ''
          },
          {
            type: 'input',
            name: 'version',
            message: '请输入版本号：',
            default: '1.0.0'
          }
        ]).then((answers) => {
          const packagePath = `${projectName}/package.json`;
          
          // 检查 package.json 是否存在
          if (fs.existsSync(packagePath)) {
            try {
				const packageContent = fs.readFileSync(packagePath, 'utf8');
				const packageJson = JSON.parse(packageContent);
				
				// 只更新用户输入的字段，避免重复
				if (answers.name) packageJson.name = answers.name;
				if (answers.description) packageJson.description = answers.description;
				if (answers.author) packageJson.author = answers.author;
				if (answers.version) packageJson.version = answers.version;
				
				// 写入更新后的 package.json
				fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
              
              console.log('\n');
              console.log(chalk.green('✨ 项目创建成功！'));
              console.log('\n');
              console.log(chalk.cyan('开始使用：'));
              console.log(chalk.white(`  cd ${projectName}`));
              console.log(chalk.white(`  npm install`));
              console.log(chalk.white(`  npm run dev`));
              console.log('\n');
            } catch (error) {
              console.log(logSymbols.warning, chalk.yellow('package.json 更新失败，但项目已下载'));
            }
          } else {
            console.log(logSymbols.warning, chalk.yellow('未找到 package.json，但项目已下载'));
            console.log(chalk.cyan(`\n开始使用：cd ${projectName}\n`));
          }
        }).catch((error) => {
          console.log(logSymbols.error, chalk.red('配置失败：'), error.message);
        });
      }
    });
  });

program
  .command('list')
  .description('查看所有可用模板')
  .action(() => {
    console.log('\n');
    console.log(chalk.cyan.bold('📦 可用模板列表：'));
    console.log('\n');
    
    Object.keys(templates).forEach((key, index) => {
      const template = templates[key];
      console.log(
        chalk.green(`${index + 1}. ${key.padEnd(15)}`),
        chalk.gray('│'),
        chalk.white(template.description)
      );
    });
    
    console.log('\n');
    console.log(chalk.yellow('使用方式：'));
    console.log(chalk.white('  mika init <template> <project-name>'));
    console.log('\n');
    console.log(chalk.gray('示例：'));
    console.log(chalk.white('  mika init vue my-vue-app'));
    console.log(chalk.white('  mika init next my-next-app'));
    console.log('\n');
  });

program
  .command('search <keyword>')
  .description('搜索模板')
  .action((keyword) => {
    console.log('\n');
    console.log(chalk.cyan.bold(`🔍 搜索结果："${keyword}"`));
    console.log('\n');
    
    const results = Object.keys(templates).filter(key => 
      key.toLowerCase().includes(keyword.toLowerCase()) ||
      templates[key].description.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (results.length === 0) {
      console.log(chalk.yellow('未找到相关模板'));
    } else {
      results.forEach((key, index) => {
        const template = templates[key];
        console.log(
          chalk.green(`${index + 1}. ${key.padEnd(15)}`),
          chalk.gray('│'),
          chalk.white(template.description)
        );
      });
    }
    console.log('\n');
  });

// 如果没有输入命令，显示帮助信息
if (!args.length) {
  program.outputHelp();
}

program.parse(process.argv);