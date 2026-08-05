
<template>
    <div class="wrapper">
        <p class="eyebrow">Full-Stack Software Engineer &middot; M.S. CS, Colorado School of Mines</p>
        <h1>Aidan Reaves</h1>
        <h3>
            I build full-stack systems that save real businesses real money &mdash; right now,
            that's a ground-up rebuild of a car dealership's 2007-era management platform,
            ~90% through migrating it to a modern architecture.
        </h3>
        <p class="availability">Open to new opportunities</p>

        <button class="btn btn--primary" @click="$emit('scroll')">View Projects &darr;</button>
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
        padding-bottom: var(--space-9);
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    h1{
        color: white;
        font-size: 3.4em;
        font-weight: 700;
        padding-bottom: var(--space-5);
        line-height: 1.1;
    }

    h3 {
        max-width: 640px;
        font-size: 1.35em;
        font-weight: 400;
        color: rgb(227, 227, 227);
        line-height: 1.5;
    }

    .eyebrow {
        margin-bottom: var(--space-3);
    }

    .availability {
        margin-top: var(--space-3);
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--color-accent-secondary);
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

button.btn--primary {
    margin-top: var(--space-8);
    padding: var(--space-5) var(--space-7);
    font-size: 1.25rem;
    width: 30%;
}


@media (max-width: 600px) {
    .wrapper{
        margin-top: 6%;
    }
    button.btn--primary{
        width: 70%;
    }
}
</style>
