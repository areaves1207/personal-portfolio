
<template>
    <div class="wrapper">
        <h1>Hello! I'm Aidan Reaves, a graduate from Colorado School of Mines with both my Masters and Bachelors in computer science!</h1>
        <h4>This is my simple portfolio!</h4>

        <button>Check it out</button>
    </div>
</template>

<style scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        background-color: rgba(110, 136, 193);
        margin: 0 auto;
        padding: 3% 15% 0 15%;
        padding-bottom: 25%;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        background-image: url("../assets/images/sorrento_dusk_blurred.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%; 
        background-position: bottom; 
    }

    h1{
        color: white;
        font-size: xx-large;
        padding-bottom: 25px;
    }

    h4{
        font-size: larger;
        color: rgb(227, 227, 227);
    }

    button{

        background-color: rgb(84, 104, 146);
        border: none;
        border-radius: 8px;
        padding: 25px;
        margin-top: 80px;
        color: white;

        font-size: x-large;

        width: 30%;
        
        transition: background-color 0.5s ease, color 0.5s ease; 
    }

    button:hover{
        background-color: rgba(110, 136, 193);
        cursor: pointer;
    }

</style>

