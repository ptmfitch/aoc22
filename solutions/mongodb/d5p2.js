[
  {
    $sort: {
      i: 1,
    },
  },
  {
    $group: {
      _id: null,
      lines: {
        $push: "$line",
      },
    },
  },
  {
    $set: {
      lines: {
        $let: {
          vars: {
            blankline: {
              $indexOfArray: ["$lines", ""],
            },
          },
          in: {
            drawing: {
              $slice: [
                "$lines",
                {
                  $subtract: ["$$blankline", 1],
                },
              ],
            },
            procedure: {
              $slice: [
                "$lines",
                {
                  $add: ["$$blankline", 1],
                },
                {
                  $size: "$lines",
                },
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
      drawing: {
        $map: {
          input: "$lines.drawing",
          as: "s",
          in: {
            $filter: {
              input: {
                $map: {
                  input: {
                    $range: [
                      0,
                      {
                        $strLenCP: "$$s",
                      },
                    ],
                  },
                  as: "c",
                  in: {
                    $cond: {
                      if: {
                        $eq: [
                          {
                            $mod: [
                              {
                                $subtract: ["$$c", 1],
                              },
                              4,
                            ],
                          },
                          0,
                        ],
                      },
                      then: {
                        $substrCP: ["$$s", "$$c", 1],
                      },
                      else: "x",
                    },
                  },
                },
              },
              cond: {
                $ne: ["$$this", "x"],
              },
            },
          },
        },
      },
      procedure: {
        $map: {
          input: "$lines.procedure",
          as: "s",
          in: {
            $cond: {
              if: {
                $eq: [
                  {
                    $strLenCP: "$$s",
                  },
                  18,
                ],
              },
              then: {
                n: {
                  $toInt: {
                    $substrCP: ["$$s", 5, 1],
                  },
                },
                s: {
                  $subtract: [
                    {
                      $toInt: {
                        $substrCP: ["$$s", 12, 1],
                      },
                    },
                    1,
                  ],
                },
                d: {
                  $subtract: [
                    {
                      $toInt: {
                        $substrCP: ["$$s", 17, 1],
                      },
                    },
                    1,
                  ],
                },
              },
              else: {
                n: {
                  $toInt: {
                    $substrCP: ["$$s", 5, 2],
                  },
                },
                s: {
                  $subtract: [
                    {
                      $toInt: {
                        $substrCP: ["$$s", 13, 1],
                      },
                    },
                    1,
                  ],
                },
                d: {
                  $subtract: [
                    {
                      $toInt: {
                        $substrCP: ["$$s", 18, 1],
                      },
                    },
                    1,
                  ],
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
      procedure: 1,
      stacks: {
        $cond: {
          if: {
            $eq: [
              {
                $size: {
                  $first: "$drawing",
                },
              },
              3,
            ],
          },
          then: {
            $map: {
              input: {
                $zip: {
                  inputs: [
                    {
                      $arrayElemAt: ["$drawing", 0],
                    },
                    {
                      $arrayElemAt: ["$drawing", 1],
                    },
                    {
                      $arrayElemAt: ["$drawing", 2],
                    },
                  ],
                },
              },
              in: {
                $reverseArray: {
                  $filter: {
                    input: "$$this",
                    as: "c",
                    cond: {
                      $ne: ["$$c", " "],
                    },
                  },
                },
              },
            },
          },
          else: {
            $map: {
              input: {
                $zip: {
                  inputs: [
                    {
                      $arrayElemAt: ["$drawing", 0],
                    },
                    {
                      $arrayElemAt: ["$drawing", 1],
                    },
                    {
                      $arrayElemAt: ["$drawing", 2],
                    },
                    {
                      $arrayElemAt: ["$drawing", 3],
                    },
                    {
                      $arrayElemAt: ["$drawing", 4],
                    },
                    {
                      $arrayElemAt: ["$drawing", 5],
                    },
                    {
                      $arrayElemAt: ["$drawing", 6],
                    },
                    {
                      $arrayElemAt: ["$drawing", 7],
                    },
                  ],
                },
              },
              in: {
                $reverseArray: {
                  $filter: {
                    input: "$$this",
                    as: "c",
                    cond: {
                      $ne: ["$$c", " "],
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
      n: {
        $size: "$stacks",
      },
    },
  },
  {
    $set: {
      rearranged: {
        $reduce: {
          input: "$procedure",
          initialValue: "$stacks",
          in: {
            $map: {
              input: {
                $range: [0, "$n"],
              },
              as: "i",
              in: {
                $let: {
                  vars: {
                    arr: {
                      $arrayElemAt: ["$$value", "$$i"],
                    },
                    len: {
                      $size: {
                        $arrayElemAt: ["$$value", "$$i"],
                      },
                    },
                  },
                  in: {
                    $switch: {
                      branches: [
                        {
                          case: {
                            $eq: ["$$this.s", "$$i"],
                          },
                          then: {
                            $slice: [
                              "$$arr",
                              {
                                $subtract: [
                                  "$$len",
                                  "$$this.n",
                                ],
                              },
                            ],
                          },
                        },
                        {
                          case: {
                            $eq: ["$$this.d", "$$i"],
                          },
                          then: {
                            $concatArrays: [
                              "$$arr",
                              {
                                $slice: [
                                  {
                                    $arrayElemAt: [
                                      "$$value",
                                      "$$this.s",
                                    ],
                                  },
                                  {
                                    $multiply: [
                                      "$$this.n",
                                      -1,
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        },
                      ],
                      default: "$$arr",
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
      res: {
        $reduce: {
          input: {
            $map: {
              input: "$rearranged",
              as: "stack",
              in: {
                $last: "$$stack",
              },
            },
          },
          initialValue: "",
          in: {
            $concat: ["$$value", "$$this"],
          },
        },
      },
    },
  },
]