'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrestadoresSchema extends Schema {
  up () {
    this.create('prestadores', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('address').notNullable()
      table.decimal('price').notNullable()
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('prestadores')
  }
}

module.exports = PrestadoresSchema
