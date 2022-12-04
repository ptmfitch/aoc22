[
  {
    $match: {
      line: {
        $ne: "",
      },
    },
  },
  {
    $set: {
      line_space: {
        $concat: [
          "$line",
          {
            $cond: {
              if: {
                $eq: [
                  {
                    $mod: [
                      {
                        $add: ["$i", 1],
                      },
                      3,
                    ],
                  },
                  0,
                ],
              },
              then: "\n",
              else: " ",
            },
          },
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      lines: {
        $push: "$line_space",
      },
    },
  },
  {
    $set: {
      groups: {
        $filter: {
          input: {
            $map: {
              input: {
                $split: [
                  {
                    $reduce: {
                      input: "$lines",
                      initialValue: "",
                      in: {
                        $concat: ["$$value", "$$this"],
                      },
                    },
                  },
                  "\n",
                ],
              },
              as: "s",
              in: {
                $split: ["$$s", " "],
              },
            },
          },
          as: "arr",
          cond: {
            $eq: [
              {
                $size: "$$arr",
              },
              3,
            ],
          },
        },
      },
    },
  },
  {
    $set: {
      priority_groups: {
        $map: {
          input: "$groups",
          as: "group",
          in: {
            $map: {
              input: "$$group",
              as: "line",
              in: {
                $map: {
                  input: {
                    $map: {
                      input: {
                        $range: [
                          0,
                          {
                            $strLenCP: "$$line",
                          },
                        ],
                      },
                      as: "j",
                      in: {
                        $substrCP: ["$$line", "$$j", 1],
                      },
                    },
                  },
                  as: "c",
                  in: {
                    $indexOfCP: [
                      "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                      "$$c",
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
  {
    $set: {
      shared_groups: {
        $map: {
          input: "$priority_groups",
          as: "g",
          in: {
            $first: {
              $setIntersection: [
                { $arrayElemAt: ["$$g", 0] },
                { $arrayElemAt: ["$$g", 1] },
                { $arrayElemAt: ["$$g", 2] },
              ],
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
        $sum: "$shared_groups",
      },
    },
  },
]