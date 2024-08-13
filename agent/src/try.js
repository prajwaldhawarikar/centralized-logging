function square(number, callback) {
  if (isNaN(number)) {
    callback(new Error(`Invalid number: ${number}`), null);
  }
  callback(null, number * number);
}

function cube(number, callback) {
  if (isNaN(number)) {
    callback(new Error(`Invalid number: ${number}`), null);
  }
  callback(null, number * number * number);
}

function checkEquality(number) {
  square(2, (err, squareRes) => {
    if (err) {
      console.log('could not perform square');
      process.exit(-2);
    }

    console.log(err);

    cube(number, (err, cubeRes) => {
      console.log(err);
      if (err) {
        console.log('could not perform cube');
        process.exit(-3);
      }
      console.log(`square(${squareRes}) and cube(${cubeRes})`);
    });
  });
}

checkEquality(NaN);
