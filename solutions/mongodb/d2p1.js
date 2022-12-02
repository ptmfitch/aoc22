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
                    $first: "$turn",
                  },
                  {
                    $last: "$turn",
                  },
                ],
              },
              then: {
                $add: [
                  3,
                  {
                    $last: "$turn",
                  },
                ],
              },
            },
            {
              case: {
                $or: [
                  {
                    $eq: ["$turn", [1, 2]],
                  },
                  {
                    $eq: ["$turn", [2, 3]],
                  },
                  {
                    $eq: ["$turn", [3, 1]],
                  },
                ],
              },
              then: {
                $add: [
                  6,
                  {
                    $last: "$turn",
                  },
                ],
              },
            },
          ],
          default: {
            $last: "$turn",
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