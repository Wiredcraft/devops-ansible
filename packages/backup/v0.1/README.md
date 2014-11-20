The backup service provides simple local backup for the services installed on the server. It relies on [BackupAllTheThings](https://pypi.python.com/pypi/backupallthethings). Consider this service only as a conveniency, not as a full-blown backup framework. 

## Backup support

Several of the databases available in [devo.ps](http://devo.ps) come with a *backup* support among which:

- MySQL 
- PostgreSQL
- CouchDB
- MongoDB
- Redis

The backup files are then available by default in `/opt/backup/YYYY/MM/DD/{service}` in compressed archives.

The services for which the backup service is available are marked in the documentation.

## Limitations

Currently the following features are **not supported**:

- remote storage
- encryption
- restore

You may want to rely on other backup frameworks to push the archives remotely and securely.

Restoring backup is still a manual task. You will have to perform it by yourself using the appropriate commands for each of the services.