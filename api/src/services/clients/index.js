import models from '../../models';
import { requests } from '../../utils';


const getClientInfo = async req => new Promise(async (resolve) => {
  const client = JSON.parse(JSON.stringify(req.user));
  client.secret = undefined;
  resolve({ code: 200, data: client });
});


const updateClient = async req => new Promise(async (resolve) => {
  const excludedKeys = ['id', 'trusted', 'createdAt', 'updatedAt'];
  const updatedClient = await requests.patch(models.client, req.user.id, req, excludedKeys);
  // remove password before returning the updated user
  updatedClient.secret = undefined;
  resolve({ code: 200, data: updatedClient });
});


const createNewClient = async req => new Promise(async (resolve) => {
  const newClientInfo = {
    name: req.body.name,
    secret: req.body.secret,
  };
  try {
    const newClient = await models.client.create(newClientInfo);
    newClient.secret = undefined;
    resolve({ code: 200, data: newClient });
  } catch (err) {
    console.log(err);
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path] = e.message;
    });
    resolve({ code: 500, data: { errors } });
  }
});

const deleteClient = async req => new Promise(async (resolve) => {
  const clientId = req.user.id;
  await models.authorizationCode.destroy({
    where:
    {
      client_id: clientId,
    },
  });
  await models.accessToken.destroy({
    where: {
      client_id: clientId,
    },
  });
  await models.refreshToken.destroy({
    where: {
      client_id: clientId,
    },
  });
  await (await models.client.findByPk(clientId)).destroy();

  resolve({ code: 200, data: { success: 'Deleted client and revoked all his tokens.' } });
});


export default {
  getClientInfo,
  updateClient,
  createNewClient,
  deleteClient,
};