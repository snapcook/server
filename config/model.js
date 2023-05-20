function checkLabel() {
  const label = [
    'Tempe',
    'Daging sapi',
    'carrot',
    'apple',
    'banana',
    'orange',
    'egg',
  ];
  const listMainIngridient = [
    {
      name: 'Tempe',
      tags: 'Tempe',
    },
    {
      name: 'Daging Sapi',
      tags: 'Daging sapi',
    },
    {
      name: 'Wortel',
      tags: 'carrot',
    },
    {
      name: 'Apel',
      tags: 'apple',
    },
    {
      name: 'Pisang',
      tags: 'banana',
    },
    {
      name: 'Jeruk',
      tags: 'orange',
    },
    {
      name: 'Telur',
      tags: 'egg',
    },
  ];
  let labelCount = 0;

  listMainIngridient.forEach((list) => {
    label.forEach((label) => {
      if (list.tags === label) {
        labelCount++;
      }
    });
  });

  if (labelCount === label.length) {
    return {
      label,
      listMainIngridient,
    };
  } else {
    throw new Error(
      'Label and List Tags is not same, please check the label config'
    );
  }
}

module.exports = checkLabel;
