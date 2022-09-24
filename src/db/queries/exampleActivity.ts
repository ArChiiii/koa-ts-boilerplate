import knex from "../connection";

export function getAllExampleActivities(limit = null) {
  let knex_limit = limit || 1000000;
  return knex("example_activity").limit(knex_limit).select("*");
}

export async function getSingleExampleActivity(id) {
  const result = await knex("example_activity").select("*").where({ id });
  return result[0];
}

export async function addExampleActivity(exampleActivity) {
  try {
    const result = await knex("example_activity")
      .insert(exampleActivity)
      .returning("*");
    return { result };
  } catch (err) {
    console.log(err.message);
    return { err };
  }
}

export function updateExampleActivity(id, exampleActivity) {
  return knex("example_activity")
    .update(exampleActivity)
    .where({ id })
    .returning("*");
}
function deleteExampleActivity(id) {
  return knex("example_activity").del().where({ id }).returning("*");
}
