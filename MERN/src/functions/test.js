export const getTest = async () => {
    try {
      const res = await fetch('http://localhost:4000/test', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    console.log();
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  