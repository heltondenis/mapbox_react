'use strict'
const Prestadores = use('App/Models/Prestadores')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with prestadores
 */
class PrestadoresController {
  /**
   * Show a list of all prestadores.
   * GET prestadores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {

    const prestadores = Prestadores.all()

    return prestadores
  }

  /**
   * Render a form to be used for creating a new prestadore.
   * GET prestadores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new prestadore.
   * POST prestadores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
  
    const prestadores = await Prestadores.create({ ...data, user_id: id })
  
    return prestadores
  }

  /**
   * Display a single prestadores.
   * GET prestador/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
      const prestadores = await Prestadores.findOrFail(params.id)

      await prestadores.load('images')

      return prestadores
  }

  /**
   * Render a form to update an existing prestadores.
   * GET prestador/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update prestadores details.
   * PUT or PATCH prestador/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const prestadores = await Prestadores.findOrFail(params.id)
  
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
  
    prestadores.merge(data)
  
    await prestadores.save()
  
    return prestadores
  }

  /**
   * Delete a prestadore with id.
   * DELETE prestadores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {
    const prestadores = await Prestadores.findOrFail(params.id)

  if (prestadores.user_id !== auth.user.id) {
    return response.status(401).send({ error: 'Not authorized' })
  }

  await prestadores.delete()
  }
  
}

module.exports = PrestadoresController
