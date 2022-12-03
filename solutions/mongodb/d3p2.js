[
  {
    $match: {
      line: {
        $ne: "",
      },
    },
  },
  {
    $sort: {
      i: 1,
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
          as: "pg",
          in: {
            $let: {
              vars: {
                shared1: {
                  $setUnion: {
                    $map: {
                      input: {
                        $filter: {
                          input: {
                            $map: {
                              input: {
                                $first: "$$pg",
                              },
                              as: "c1",
                              in: {
                                $filter: {
                                  input: {
                                    $arrayElemAt: [
                                      "$$pg",
                                      1,
                                    ],
                                  },
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
                      as: "arr",
                      in: {
                        $first: "$$arr",
                      },
                    },
                  },
                },
              },
              in: {
                $first: {
                  $first: {
                    $filter: {
                      input: {
                        $map: {
                          input: "$$shared1",
                          as: "c1",
                          in: {
                            $filter: {
                              input: {
                                $arrayElemAt: ["$$pg", 2],
                              },
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