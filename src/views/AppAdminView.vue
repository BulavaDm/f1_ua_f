<template>
    <div class="admin-view">
        <nav class="admin-view__navigation">
            <div v-for="item in items" :key="item.id" class="admin-view__navigation-btn">
                <router-link :to="item.route">
                    <app-control-btn
                        :text="item.name"
                    />
                </router-link>
            </div>
        </nav>
        <main class="admin-view__content">
            <router-view/>
        </main>
    </div>
</template>

<script>
    import { menuItems } from "../constants/menu";

    export default {
        name: "AppAdminView",

        beforeRouteEnter (to, from, next) {
            if (to.path === '/') {
                next(vm => {
                    vm.$router.push({ path: '/news' });
                })
            } else {
                next();
            }
        },

        computed: {
            items() {
                return menuItems;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .admin-view {
        width: 100%;
        min-height: 100vh;
        display: flex;

        &__navigation {
            width: 100%;
            max-width: 180px;
            padding: 30px 15px;
            background: #C1CFEA;
        }

        &__content {
            width: calc(100% - 180px);
            box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.2);
            background: #F1F7FC;
        }

        &__navigation-btn {
            margin-bottom: 15px;
        }
    }
</style>