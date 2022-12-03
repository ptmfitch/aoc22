[
  {
    $sort: {
      i: 1,
    },
  },
  {
    $set: {
      arr: {
        $map: {
          input: {
            $range: [
              0,
              {
                $strLenCP: "$line",
              },
            ],
          },
          as: "j",
          in: {
            $substrCP: ["$line", "$$j", 1],
          },
        },
      },
      n: {
        $strLenCP: "$line",
      },
    },
  },
  {
    $set: {
      priorities: {
        $map: {
          input: "$arr",
          as: "c",
          in: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$$c", "a"],
                  },
                  then: 1,
                },
                {
                  case: {
                    $eq: ["$$c", "b"],
                  },
                  then: 2,
                },
                {
                  case: {
                    $eq: ["$$c", "c"],
                  },
                  then: 3,
                },
                {
                  case: {
                    $eq: ["$$c", "d"],
                  },
                  then: 4,
                },
                {
                  case: {
                    $eq: ["$$c", "e"],
                  },
                  then: 5,
                },
                {
                  case: {
                    $eq: ["$$c", "f"],
                  },
                  then: 6,
                },
                {
                  case: {
                    $eq: ["$$c", "g"],
                  },
                  then: 7,
                },
                {
                  case: {
                    $eq: ["$$c", "h"],
                  },
                  then: 8,
                },
                {
                  case: {
                    $eq: ["$$c", "i"],
                  },
                  then: 9,
                },
                {
                  case: {
                    $eq: ["$$c", "j"],
                  },
                  then: 10,
                },
                {
                  case: {
                    $eq: ["$$c", "k"],
                  },
                  then: 11,
                },
                {
                  case: {
                    $eq: ["$$c", "l"],
                  },
                  then: 12,
                },
                {
                  case: {
                    $eq: ["$$c", "m"],
                  },
                  then: 13,
                },
                {
                  case: {
                    $eq: ["$$c", "n"],
                  },
                  then: 14,
                },
                {
                  case: {
                    $eq: ["$$c", "o"],
                  },
                  then: 15,
                },
                {
                  case: {
                    $eq: ["$$c", "p"],
                  },
                  then: 16,
                },
                {
                  case: {
                    $eq: ["$$c", "q"],
                  },
                  then: 17,
                },
                {
                  case: {
                    $eq: ["$$c", "r"],
                  },
                  then: 18,
                },
                {
                  case: {
                    $eq: ["$$c", "s"],
                  },
                  then: 19,
                },
                {
                  case: {
                    $eq: ["$$c", "t"],
                  },
                  then: 20,
                },
                {
                  case: {
                    $eq: ["$$c", "u"],
                  },
                  then: 21,
                },
                {
                  case: {
                    $eq: ["$$c", "v"],
                  },
                  then: 22,
                },
                {
                  case: {
                    $eq: ["$$c", "w"],
                  },
                  then: 23,
                },
                {
                  case: {
                    $eq: ["$$c", "x"],
                  },
                  then: 24,
                },
                {
                  case: {
                    $eq: ["$$c", "y"],
                  },
                  then: 25,
                },
                {
                  case: {
                    $eq: ["$$c", "z"],
                  },
                  then: 26,
                },
                {
                  case: {
                    $eq: ["$$c", "A"],
                  },
                  then: 27,
                },
                {
                  case: {
                    $eq: ["$$c", "B"],
                  },
                  then: 28,
                },
                {
                  case: {
                    $eq: ["$$c", "C"],
                  },
                  then: 29,
                },
                {
                  case: {
                    $eq: ["$$c", "D"],
                  },
                  then: 30,
                },
                {
                  case: {
                    $eq: ["$$c", "E"],
                  },
                  then: 31,
                },
                {
                  case: {
                    $eq: ["$$c", "F"],
                  },
                  then: 32,
                },
                {
                  case: {
                    $eq: ["$$c", "G"],
                  },
                  then: 33,
                },
                {
                  case: {
                    $eq: ["$$c", "H"],
                  },
                  then: 34,
                },
                {
                  case: {
                    $eq: ["$$c", "I"],
                  },
                  then: 35,
                },
                {
                  case: {
                    $eq: ["$$c", "J"],
                  },
                  then: 36,
                },
                {
                  case: {
                    $eq: ["$$c", "K"],
                  },
                  then: 37,
                },
                {
                  case: {
                    $eq: ["$$c", "L"],
                  },
                  then: 38,
                },
                {
                  case: {
                    $eq: ["$$c", "M"],
                  },
                  then: 39,
                },
                {
                  case: {
                    $eq: ["$$c", "N"],
                  },
                  then: 40,
                },
                {
                  case: {
                    $eq: ["$$c", "O"],
                  },
                  then: 41,
                },
                {
                  case: {
                    $eq: ["$$c", "P"],
                  },
                  then: 42,
                },
                {
                  case: {
                    $eq: ["$$c", "Q"],
                  },
                  then: 43,
                },
                {
                  case: {
                    $eq: ["$$c", "R"],
                  },
                  then: 44,
                },
                {
                  case: {
                    $eq: ["$$c", "S"],
                  },
                  then: 45,
                },
                {
                  case: {
                    $eq: ["$$c", "T"],
                  },
                  then: 46,
                },
                {
                  case: {
                    $eq: ["$$c", "U"],
                  },
                  then: 47,
                },
                {
                  case: {
                    $eq: ["$$c", "V"],
                  },
                  then: 48,
                },
                {
                  case: {
                    $eq: ["$$c", "W"],
                  },
                  then: 49,
                },
                {
                  case: {
                    $eq: ["$$c", "X"],
                  },
                  then: 50,
                },
                {
                  case: {
                    $eq: ["$$c", "Y"],
                  },
                  then: 51,
                },
                {
                  case: {
                    $eq: ["$$c", "Z"],
                  },
                  then: 52,
                },
              ],
              default: 0,
            },
          },
        },
      },
      half_n: {
        $divide: ["$n", 2],
      },
    },
  },
  {
    $set: {
      x: "$n",
      h1: {
        $slice: ["$priorities", "$half_n"],
      },
      h2: {
        $slice: [
          "$priorities",
          {
            $multiply: ["$half_n", -1],
          },
        ],
      },
    },
  },
  {
    $set: {
      shared: {
        $first: {
          $first: {
            $filter: {
              input: {
                $map: {
                  input: "$h1",
                  as: "c1",
                  in: {
                    $filter: {
                      input: "$h2",
                      as: "c2",
                      cond: {
                        $eq: ["$$c1", "$$c2"],
                      },
                    },
                  },
                },
              },
              as: "arrs",
              cond: {
                $gt: [
                  {
                    $size: "$$arrs",
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      res: {
        $sum: "$shared",
      },
    },
  },
]