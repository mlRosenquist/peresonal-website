<script>
    import { onMount } from "svelte";

    let showIndicator = true; // Initially set to true

    onMount(() => {
        const handleScroll = () => {
            // Check if we are at the top of the page
            showIndicator = window.scrollY === 0;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            // Cleanup listener on component destroy
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<div class="scroll-indicator" class:visible={showIndicator}>
	<div class="mouse">
		<div class="wheel" />
	</div>
</div>

<style>
	.scroll-indicator {
		position: absolute;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		transition: opacity 1s ease; /* smooth transition for showing and hiding */
		opacity: 0; /* initially hidden */
		pointer-events: none; /* ensure it doesn't interfere with click events when hidden */
	}

	.scroll-indicator.visible {
		opacity: 1; /* shown */
	}

	.mouse {
		width: 20px;
		height: 28px;
		border: 2px solid gray;
		border-radius: 12px;
	}

	.wheel {
		width: 2px;
		height: 5px;
		background: gray;
		position: absolute;
		margin-top: 4px;
		margin-left: 8px;
		animation: s-OZOSCitC0qEq-scrollAnimation 1.5s infinite;
	}

	@keyframes scrollAnimation {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(4px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
