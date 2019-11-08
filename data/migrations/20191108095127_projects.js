exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments('project_id');
            tbl.string('project_name', 128).notNullable();
            tbl.string('description');
            tbl.boolean('complete').defaultTo(false);
        })
        .createTable('resources', tbl => {
            tbl.increments('resource_id');
            tbl.string('resource_name', 128)
                .unique()
                .notNullable();
            tbl.string('description');
        })
        .createTable('project_resources', tbl => {
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('description').notNullable();
            tbl.string('notes');
            tbl.boolean('complete').defaultsTo(false);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('project_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
