import fetch from './fetch';

// 登陆
export function login(data) {
  return fetch({
    url: '/api/footfall/user/login',
    method: 'POST',
    data: data || {},
  });
}

// 获取每日流量统计
export function sum_footfall(data) {
  return fetch({
    url: '/api/footfall/user/sum_footfall',
    method: 'POST',
    data: data || {},
  });
}

// 获取房间列表
export function room_list(data) {
  return fetch({
    url: '/api/footfall/user/room_list',
    method: 'POST',
    data: data || {},
  });
}

// 出门登记
export function out_record(data) {
  return fetch({
    url: '/api/footfall/user/out_record',
    method: 'POST',
    data: data || {},
  });
}

// 获取楼宇列表
export function building_list(data) {
  return fetch({
    url: '/api/footfall/user/building_list',
    method: 'POST',
    data: data || {},
  });
}

// 获取房间内人员列表
export function room_people(data) {
  return fetch({
    url: '/api/footfall/user/room_people',
    method: 'POST',
    data: data || {},
  });
}
// 增加房间内人员
export function add_person(data) {
  return fetch({
    url: '/api/footfall/user/add_person',
    method: 'POST',
    data: data || {},
  });
}
// 进入搜索车牌号
export function search_car(data) {
  return fetch({
    url: '/api/footfall/user/search_car',
    method: 'POST',
    data: data || {},
  });
}
// 进入搜索人名
export function search_name(data) {
  return fetch({
    url: '/api/footfall/user/search_name',
    method: 'POST',
    data: data || {},
  });
}
