import { defineStore } from "pinia";
import { ref } from 'vue';


interface User {
    id: string;
    name: string;
    email: string;
}

export const userStore = defineStore("users", () => {
    const user = ref<User | null>(null);

    async function authenticate(credentials: object) {
        const { data } = await useFetch('http://127.0.0.1:3333/auth/login', {
            method: 'POST',
            body: credentials,
        });

        if (data.value) {
            user.value = data.value as User;
        }
    }

    return { user, authenticate };
});