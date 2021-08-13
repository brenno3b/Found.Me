import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1628862940392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'postalCode',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'int',
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'mainEmail',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'secondEmail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mainPhoneNumber',
            type: 'varchar',
          },
          {
            name: 'secondPhoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_UsersAddress',
            referencedTableName: 'address',
            referencedColumnNames: ['id'],
            columnNames: ['addressId'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_UsersAddress');

    await queryRunner.dropTable('users');
    await queryRunner.dropTable('address');
  }
}
