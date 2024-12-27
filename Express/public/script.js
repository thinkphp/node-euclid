document.getElementById('gcd-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const num1 = document.getElementById('num1').value;
  const num2 = document.getElementById('num2').value;

  try {
    const response = await fetch(`/gcd?num1=${num1}&num2=${num2}`);
    const data = await response.json();

    if (response.ok) {
      document.getElementById('result').innerText = `GCD: ${data.gcd}`;
    } else {
      document.getElementById('result').innerText = `Error: ${data.error}`;
    }
  } catch (error) {
    document.getElementById('result').innerText = `Error: Could not compute GCD.`;
  }
});
