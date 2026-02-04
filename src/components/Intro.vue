
<template>
    <div class="wrapper">
        <h1>Hello, I'm Aidan!</h1>
        <h4>A graduate from The Colorado School of Mines with both my Masters and Bachelors in computer science!</h4>

        <button @click="$emit('scroll')">View my work &darr;</button>
    </div>
</template>

<script setup>
    const emit = defineEmits(['scroll'])
</script>


<style scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        margin: auto auto;
        padding: 10% 15% 0 15%;
        padding-bottom: 25%;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        /* background-image: url("../assets/images/sorrento_dusk_blurred.jpg"); */
        background-repeat: no-repeat;
        background-size: 100% 100%; 
        background-position: bottom; 
    }

    h1{
        color: white;
        font-size: 3em;
        padding-bottom: 25px;
    }

    h4{
        font-size: 2em;
        color: rgb(227, 227, 227);
    }

button {
    background: linear-gradient(135deg, #4e54c8, #8f94fb);
    border: none;
    border-radius: 12px;
    padding: 20px 35px;
    margin-top: 80px;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    width: 30%;
    transition: 
        background-color 1s ease, /* slow background transition */
        transform 0.3s ease, 
        box-shadow 0.3s ease;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(78, 84, 200, 0.5);
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* gradient shift */
}


@media (max-width: 600px) {
    .wrapper{
        margin-top: 6%;
    }
}
</style>

