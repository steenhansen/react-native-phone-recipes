async function awaitSeconds(wait_seconds) {
  const abs_milli_seconds = Math.abs(wait_seconds) * 1000;
  await new Promise(resolve => setTimeout(resolve, abs_milli_seconds));
}

export {
  awaitSeconds
};
