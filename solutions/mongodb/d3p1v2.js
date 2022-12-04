[
  {
    $match: {
      line: { $ne: "" },
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
      half_n: {
        $divide: [
          {
            $strLenCP: "$line",
          },
          2,
        ],
      },
    },
  },
  {
    $set: {
      c: {
        $first: {
          $setIntersection: [
            { $slice: ["$arr", "$half_n"] },
            {
              $slice: [
                "$arr",
                {
                  $multiply: ["$half_n", -1],
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    $set: {
      priority: {
        $indexOfCP: [
          "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
          "$c",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      res: {
        $sum: "$priority",
      },
    },
  },
]