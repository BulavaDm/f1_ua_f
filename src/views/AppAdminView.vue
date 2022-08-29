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
<!--            <button type="button" @click="signOut">Out</button>-->
        </nav>
        <main class="admin-view__content">
            <router-view/>
        </main>
    </div>
</template>

<script>
    import { menuItems } from "../constants/menu";
    import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

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

        created() {
            const auth = getAuth();
            auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log(user);
                } else {
                    const provider = new GoogleAuthProvider();
                    signInWithPopup(auth, provider)
                        .then((result) => {
                            console.log(result);
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            const credential = GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;
                            // The signed-in user info.
                            const user = result.user;
                            // ...
                        }).catch((error) => {
                        console.log(error);
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        // ...
                    });
                }
            })
        },

        computed: {
            items() {
                return menuItems;
            }
        },

        methods: {
            signOut() {
                const auth = getAuth();
                signOut(auth).then(() => {
                    // Sign-out successful.
                }).catch((error) => {
                    // An error happened.
                });
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