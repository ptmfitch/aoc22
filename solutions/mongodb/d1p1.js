[
  {
    $sort: {
      i: 1,
    },
  },
  {
    $project: {
      _id: 0,
      cals: {
        $cond: {
          if: {
            $eq: ["$line", ""],
          },
          then: -1,
          else: {
            $toInt: "$line",
          },
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      cals: {
        $push: "$cals",
      },
    },
  },
  {
    $set: {
      spaces: {
        $let: {
          vars: {
            inner: {
              $filter: {
                input: {
                  $range: [
                    0,
                    {
                      $size: "$cals",
                    },
                  ],
                },
                cond: {
                  $lt: [
                    {
                      $arrayElemAt: ["$cals", "$$this"],
                    },
                    0,
                  ],
                },
              },
            },
          },
          in: {
            $concatArrays: [
              "$$inner",
              [
                {
                  $size: "$cals",
                },
              ],
            ],
          },
        },
      },
    },
  },
  {
    $set: {
      elves: {
        $map: {
          input: "$spaces",
          as: "i",
          in: {
            $cond: {
              if: {
                $eq: [
                  "$$i",
                  {
                    $first: "$spaces",
                  },
                ],
              },
              then: {
                $sum: {
                  $slice: ["$cals", 0, "$$i"],
                },
              },
              else: {
                $let: {
                  vars: {
                    j: {
                      $indexOfArray: ["$spaces", "$$i"],
                    },
                    n: {
                      $add: [
                        {
                          $arrayElemAt: [
                            "$spaces",
                            {
                              $subtract: [
                                {
                                  $indexOfArray: [
                                    "$spaces",
                                    "$$i",
                                  ],
                                },
                                1,
                              ],
                            },
                          ],
                        },
                        1,
                      ],
                    },
                  },
                  in: {
                    $sum: {
                      $slice: [
                        "$cals",
                        "$$n",
                        {
                          $subtract: ["$$i", "$$n"],
                        },
                      ],
                    },
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
    $project: {
      _id: 0,
      res: {
        $max: "$elves",
      },
    },
  },
]