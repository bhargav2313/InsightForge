// Simple client-side helper for checking the API health and showing status
document.addEventListener('DOMContentLoaded', () => {
	const statusEl = document.getElementById('api-status');
	const btn = document.getElementById('check-api');

	async function checkHealth() {
		if (!statusEl) return;
		statusEl.textContent = 'Checking...';
		statusEl.className = '';
		try {
			const res = await fetch('/health');
			if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
			const data = await res.json();
			statusEl.textContent = `API status: ${data.status}`;
			statusEl.classList.add('ok');
		} catch (err) {
			statusEl.textContent = `API error: ${err.message}`;
			statusEl.classList.add('error');
			console.error('Health check failed', err);
		}
	}

	// Click to re-check manually
	if (btn) btn.addEventListener('click', checkHealth);

	// Run one check on load
	checkHealth();
});

// Export for testing or use in other modules
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { checkHealth: null };
}
