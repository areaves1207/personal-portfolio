
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
        margin: auto auto;
        padding: 10% 25% 0 25%;
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
        font-size: 3em;
        padding-bottom: 25px;
    }

    h4{
        font-size: 2em;
        color: rgb(227, 227, 227);
    }

    button{

        background: rgb(99, 132, 202);
        border: none;
        border-radius: 8px;
        padding: 25px;
        margin-top: 80px;
        color: white;

        font-size: x-large;

        width: 30%;
        
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    button:hover{
        background: rgb(133, 161, 223);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
    }

</style>

