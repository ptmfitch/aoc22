[
  {
    $sort: {
      i: 1,
    },
  },
  {
    $project: {
      turn: {
        $map: {
          input: {
            $split: ["$line", " "],
          },
          as: "s",
          in: {
            $switch: {
              branches: [
                {
                  case: {
                    $in: ["$$s", ["A", "X"]],
                  },
                  then: 1,
                },
                {
                  case: {
                    $in: ["$$s", ["B", "Y"]],
                  },
                  then: 2,
                },
              ],
              default: 3,
            },
          },
        },
      },
    },
  },
  {
    $set: {
      score: {
        $switch: {
          branches: [
            {
              case: {
                $eq: [
                  {
                    $last: "$turn",
                  },
                  1,
                ],
              },
              then: {
                $cond: {
                  if: {
                    $gte: [
                      {
                        $first: "$turn",
                      },
                      2,
                    ],
                  },
                  then: {
                    $subtract: [
                      {
                        $first: "$turn",
                      },
                      1,
                    ],
                  },
                  else: 3,
                },
              },
            },
            {
              case: {
                $eq: [
                  {
                    $last: "$turn",
                  },
                  3,
                ],
              },
              then: {
                $cond: {
                  if: {
                    $lte: [
                      {
                        $first: "$turn",
                      },
                      2,
                    ],
                  },
                  then: {
                    $add: [
                      {
                        $add: [
                          {
                            $first: "$turn",
                          },
                          1,
                        ],
                      },
                      6,
                    ],
                  },
                  else: 7,
                },
              },
            },
          ],
          default: {
            $add: [
              {
                $first: "$turn",
              },
              3,
            ],
          },
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      res: {
        $sum: "$score",
      },
    },
  },
]