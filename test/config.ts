// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import { DataSourceOptions } from 'typeorm';

const SHOULD_USE_MYSQL =
  process.env.MYSQL_USER != null ||
  process.env.MYSQL_PORT != null ||
  process.env.MYSQL_PASSWORD != null ||
  process.env.MYSQL_DB != null;

export const connectionConfig: DataSourceOptions = SHOULD_USE_MYSQL
  ? {
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '', 10) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password:
        process.env.MYSQL_PASSWORD !== undefined
          ? process.env.MYSQL_PASSWORD === ''
            ? undefined
            : process.env.MYSQL_PASSWORD
          : 'password',
      database: process.env.MYSQL_DB || 'casbin',
      dropSchema: true,
    }
  : {
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
    };
