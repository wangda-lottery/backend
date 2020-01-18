import {
  generalRoutes,
  permissionRoutes
} from '../../router';
import {
  RouterActions
} from '../../store/actionTypes';
import {
  RouterMutations
} from '../../store/mutationTypes';
import {
  StaffRoles
} from "../../utils";

/**
 * 通过 meta.roles 判断是否与当前用户权限匹配。
 */
function hasPermission(roles, route) {
  // 先判断平台业务权限，再判断用户角色权限
  if (route.meta && route.meta.requiredBizId) {
    return false;
  } else {
    if (roles.includes(StaffRoles.su)) {
      return true;
    }

    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role));
    } else {
      return true;
    }
  }
}

/**
 * 递归过滤带权限的路由表。
 */
function filterAsyncRouter(routes, roles) {
  const allowedRoutes = [];
  routes.forEach(route => {
    const tmp = {...route};
    const allowed = hasPermission(roles, tmp);
    if (allowed) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
        if (tmp.children.length) allowedRoutes.push(tmp);
      } else {
        allowedRoutes.push(tmp);
      }
    }
  });

  return allowedRoutes;
}

/**
 * 权限 store.
 */
const permission = {
  state: {
    routes: generalRoutes,
    routerGenerated: false
  },

  getters: {
    routerGenerated(state) {
      return state.routerGenerated
    },

    routes(state) {
      return state.routes;
    }
  },

  mutations: {
    [RouterMutations.SetRouters]: (state, allowedRoutes) => {
      // 对 routes 的数组做了排版，权限相关的订单插入在第二个位置
      generalRoutes.splice(1, 0, ...allowedRoutes);

      state.routerGenerated = true;
      state.routes = generalRoutes;
    }
  },

  actions: {
    async [RouterActions.GenerateRoutes]({commit, getters}) {
      let allowedRoutes = null;
      allowedRoutes = await filterAsyncRouter(permissionRoutes, getters.userInfo.roles);

      commit(RouterMutations.SetRouters, allowedRoutes);

      return allowedRoutes;
    }
  }
};

export default permission;
