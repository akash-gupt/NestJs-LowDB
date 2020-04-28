import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as uuid from 'uuid';

type CollctionName = 'auths';

@Injectable()
export class LowdbService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase('auths');
  }

  private async initDatabase(collctionName: CollctionName) {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);
    const listUsers = await this.db.get(collctionName).value();
    if (!listUsers) {
      await this.db.set(collctionName, []).write();
    }
  }

  async findAll(collctionName: CollctionName): Promise<any> {
    const listUsers = await this.db.get(collctionName).value();
    return listUsers;
  }

  async find(condition: object, collctionName: CollctionName): Promise<any> {
    const values = await this.db.get(collctionName).find(condition).value();
    return values;
  }

  async update(
    key: string,
    value: string | String,
    collctionName: string,
    dataUpdate: any,
  ): Promise<any> {
    const listUsers = await this.db.get(collctionName).value();
    let out;
    const listData = listUsers.map(user => {
      if (user[key] !== value) return user;
      if (user[key] === value) {
        out = Object.assign(user, dataUpdate);
        return out;
      }
    });
    await this.db.set(collctionName, listData).write();
    return out;
  }

  async add(record: any, collctionName: CollctionName): Promise<any> {
    const listData = await this.db.get(collctionName).value();
    record.id = uuid.v1();
    listData.push(record);
    await this.db.set(collctionName, listData).write();
    return record;
  }
}
