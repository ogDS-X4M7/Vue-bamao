const express = require('express')
// 创建路由对象
const router = express.Router()
const user_handler = require('../router_handler/user_handler')



// 登录接口接口
router.post('/login', user_handler.login_handler)
// 获取用户基本信息接口
router.get('/getUserinfo', user_handler.getUserinfo_handler)

// 获取品牌管理数据接口
router.post('/getBrandData', user_handler.getBrandData_handler)
// 传递品牌管理图片接口
router.post('/uploadPhotoData', user_handler.uploadPhotoData_handler)
// 添加或修改品牌数据接口
router.post('/uploadImg', user_handler.uploadImg_handler)
// 修改品牌brandName接口
router.post('/uploadBrandName', user_handler.uploadBrandName_handler)
// 删除某个品牌数据接口
router.post('/delBrandData', user_handler.delBrandData_handler)

// 获取一级管理数据接口
router.get('/getAttrDataOne', user_handler.getAttrDataOne_handler)
// 获取二级管理数据接口
router.post('/getAttrDataTwo', user_handler.getAttrDataTwo_handler)
// 获取最终管理数据接口
router.post('/getAttrDataEnd', user_handler.getAttrDataEnd_handler)
// 添加或修改管理数据接口
router.post('/uploadAttrData', user_handler.uploadAttrData_handler)
// 删除管理数据接口
router.post('/deleteAttrData', user_handler.deleteAttrData_handler)

// 获取用户管理数据接口
router.post('/getAclUserData', user_handler.getAclUserData_handler)
// 添加用户管理数据接口
router.post('/createUserData', user_handler.createUserData_handler)
// 编辑用户管理数据接口----没用
// router.post('/editUserData', user_handler.editUserData_handler)
// 删除用户数据接口
router.post('/delUserData', user_handler.delUserData_handler)
// 修改用户状态接口
router.post('/changeState', user_handler.changeState_handler)
// 获取用户角色数据和全部角色数据接口
router.post('/getUserRoleData', user_handler.getUserRoleData_handler)
// 修改用户角色数据接口
router.post('/uploadUserRoleData', user_handler.uploadUserRoleData_handler)

// 获取角色数据接口
router.post('/getRoleData', user_handler.getAclRoleData_handler)
// 添加或修改角色数据接口
router.post('/uploadRoleData', user_handler.uploadRoleData_handler)
// 删除角色数据接口
router.post('/deleteRoleData', user_handler.deleteRoleData_handler)
// 获取角色权限数据接口
router.post('/getRolePermission', user_handler.getRolePermission_handler)
// 修改角色权限数据接口
router.post('/changeRolePermission', user_handler.changeRolePermission_handler)

// 获取菜单数据接口
router.get('/getMenuData', user_handler.getMenuData_handler)
// 添加/更新菜单数据接口
router.post('/uploadMenuData', user_handler.uploadMenuData_handler)
// 删除菜单数据接口
router.post('/deleteMenuData', user_handler.deleteMenuData_handler)

// 获取异步路由数据接口---没用
// router.get('/getAsyncRoute', user_handler.getAsyncRoute_handler)
// 分配菜单权限接口---没用
// router.post('/distribute', user_handler.distribute_handler)
// 获取浏览板数据接口
router.get('/getMessage', user_handler.getMessage_handler)
// 添加浏览板数据接口
router.post('/addMessage', user_handler.addMessage_handler)


module.exports = router