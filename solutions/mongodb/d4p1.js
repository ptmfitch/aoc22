[
  {
    $set: {
      ranges: {
        $map: {
          input: {
            $split: ["$line", ","],
          },
          as: "s",
          in: {
            $let: {
              vars: {
                ss: {
                  $split: ["$$s", "-"],
                },
              },
              in: {
                $range: [
                  {
                    $toInt: {
                      $arrayElemAt: ["$$ss", 0],
                    },
                  },
                  {
                    $add: [
                      {
                        $toInt: {
                          $arrayElemAt: ["$$ss", 1],
                        },
                      },
                      1,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  {
    $set: {
      overlaps: {
        $or: [
          {
            $setIsSubset: [
              {
                $arrayElemAt: ["$ranges", 0],
              },
              {
                $arrayElemAt: ["$ranges", 1],
              },
            ],
          },
          {
            $setIsSubset: [
              {
                $arrayElemAt: ["$ranges", 1],
              },
              {
                $arrayElemAt: ["$ranges", 0],
              },
            ],
          },
        ],
      },
    },
  },
  {
    $match: {
      overlaps: true,
    },
  },
  {
    $count: "res",
  },
]