/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter6597 = { 'addedBy': { '$in': user } };
      const user5570 = await deleteUser(userFilter6597);
      const userFilter0925 = { 'updatedBy': { '$in': user } };
      const user8897 = await deleteUser(userFilter0925);
      const userTokensFilter5676 = { 'userId': { '$in': user } };
      const userTokens0062 = await deleteUserTokens(userTokensFilter5676);
      const userTokensFilter2148 = { 'addedBy': { '$in': user } };
      const userTokens8487 = await deleteUserTokens(userTokensFilter2148);
      const userTokensFilter4263 = { 'updatedBy': { '$in': user } };
      const userTokens3549 = await deleteUserTokens(userTokensFilter4263);
      const roleFilter8269 = { 'addedBy': { '$in': user } };
      const role6573 = await deleteRole(roleFilter8269);
      const roleFilter9363 = { 'updatedBy': { '$in': user } };
      const role7792 = await deleteRole(roleFilter9363);
      const projectRouteFilter3435 = { 'addedBy': { '$in': user } };
      const projectRoute5833 = await deleteProjectRoute(projectRouteFilter3435);
      const projectRouteFilter8379 = { 'updatedBy': { '$in': user } };
      const projectRoute3809 = await deleteProjectRoute(projectRouteFilter8379);
      const routeRoleFilter4277 = { 'addedBy': { '$in': user } };
      const routeRole1234 = await deleteRouteRole(routeRoleFilter4277);
      const routeRoleFilter6587 = { 'updatedBy': { '$in': user } };
      const routeRole5209 = await deleteRouteRole(routeRoleFilter6587);
      const userRoleFilter0912 = { 'userId': { '$in': user } };
      const userRole9590 = await deleteUserRole(userRoleFilter0912);
      const userRoleFilter6265 = { 'addedBy': { '$in': user } };
      const userRole5063 = await deleteUserRole(userRoleFilter6265);
      const userRoleFilter7819 = { 'updatedBy': { '$in': user } };
      const userRole7672 = await deleteUserRole(userRoleFilter7819);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter2318 = { 'roleId': { '$in': role } };
      const routeRole1931 = await deleteRouteRole(routeRoleFilter2318);
      const userRoleFilter1608 = { 'roleId': { '$in': role } };
      const userRole2269 = await deleteUserRole(userRoleFilter1608);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter8489 = { 'routeId': { '$in': projectroute } };
      const routeRole4368 = await deleteRouteRole(routeRoleFilter8489);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter7599 = { 'addedBy': { '$in': user } };
      const user0469 = await softDeleteUser(userFilter7599, updateBody);
      const userFilter6898 = { 'updatedBy': { '$in': user } };
      const user9534 = await softDeleteUser(userFilter6898, updateBody);
      const userTokensFilter4695 = { 'userId': { '$in': user } };
      const userTokens9595 = await softDeleteUserTokens(userTokensFilter4695, updateBody);
      const userTokensFilter5824 = { 'addedBy': { '$in': user } };
      const userTokens7820 = await softDeleteUserTokens(userTokensFilter5824, updateBody);
      const userTokensFilter8572 = { 'updatedBy': { '$in': user } };
      const userTokens2334 = await softDeleteUserTokens(userTokensFilter8572, updateBody);
      const roleFilter3522 = { 'addedBy': { '$in': user } };
      const role7564 = await softDeleteRole(roleFilter3522, updateBody);
      const roleFilter1620 = { 'updatedBy': { '$in': user } };
      const role5201 = await softDeleteRole(roleFilter1620, updateBody);
      const projectRouteFilter5203 = { 'addedBy': { '$in': user } };
      const projectRoute5263 = await softDeleteProjectRoute(projectRouteFilter5203, updateBody);
      const projectRouteFilter6207 = { 'updatedBy': { '$in': user } };
      const projectRoute8449 = await softDeleteProjectRoute(projectRouteFilter6207, updateBody);
      const routeRoleFilter8220 = { 'addedBy': { '$in': user } };
      const routeRole9653 = await softDeleteRouteRole(routeRoleFilter8220, updateBody);
      const routeRoleFilter3981 = { 'updatedBy': { '$in': user } };
      const routeRole9948 = await softDeleteRouteRole(routeRoleFilter3981, updateBody);
      const userRoleFilter5409 = { 'userId': { '$in': user } };
      const userRole5868 = await softDeleteUserRole(userRoleFilter5409, updateBody);
      const userRoleFilter0308 = { 'addedBy': { '$in': user } };
      const userRole9293 = await softDeleteUserRole(userRoleFilter0308, updateBody);
      const userRoleFilter7519 = { 'updatedBy': { '$in': user } };
      const userRole7346 = await softDeleteUserRole(userRoleFilter7519, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9380 = { 'roleId': { '$in': role } };
      const routeRole3765 = await softDeleteRouteRole(routeRoleFilter9380, updateBody);
      const userRoleFilter3110 = { 'roleId': { '$in': role } };
      const userRole8940 = await softDeleteUserRole(userRoleFilter3110, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter9613 = { 'routeId': { '$in': projectroute } };
      const routeRole6224 = await softDeleteRouteRole(routeRoleFilter9613, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
