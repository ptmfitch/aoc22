[
  {
    $set: {
      markers: {
        $map: {
          input: {
            $range: [
              0,
              {
                $subtract: [
                  {
                    $strLenCP: "$line",
                  },
                  3 // Part 1
                  // 13, // Part 2
                ],
              },
            ],
          },
          as: "i",
          in: {
            $let: {
              vars: {
                s: {
                  $substrCP: ["$line", "$$i", 4], // Part 1
                  // $substrCP: ["$line", "$$i", 14], // Part 2
                },
              },
              in: {
                $map: {
                  input: {
                    $range: [
                      0,
                      {
                        $strLenCP: "$$s",
                      },
                    ],
                  },
                  as: "j",
                  in: {
                    $substrCP: ["$$s", "$$j", 1],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $set: {
      marker: {
        $add: [
          {
            $indexOfArray: [
              "$markers",
              {
                $first: {
                  $filter: {
                    input: "$markers",
                    as: "marker",
                    cond: {
                      $eq: [
                        {
                          $size: "$$marker",
                        },
                        {
                          $size: {
                            $setUnion: "$$marker",
                          },
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
          {
            $size: {
              $first: "$markers",
            },
          },
        ],
      },
    },
  },
]