const { exec } = require('child_process');
const path = require('path');
const moment = require('moment');
const { dbUrl } = require('./config');

// Разбор строки подключения, чтобы получить имя базы данных
const dbName = dbUrl.split('/').pop();

// Форматирование текущей даты и времени для использования в имени каталога резервной копии
const currentDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');

// Определение пути для сохранения резервной копии
const backupDir = path.join(__dirname, 'backup', `${dbName}_${currentDateTime}`);

// Создание команды mongodump с необходимыми параметрами
const mongodumpCmd = `mongodump --uri="${dbUrl}" --out="${backupDir}"`;

// Запуск команды mongodump
exec(mongodumpCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating backup: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error creating backup: ${stderr}`);
    return;
  }
  console.log(`Backup created successfully in ${backupDir}`);
});
