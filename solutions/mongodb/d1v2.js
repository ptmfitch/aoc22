[
  {
    $sort: {
      i: 1,
    },
  },
  {
    $project: {
      _id: 0,
      s: {
        $cond: {
          if: {
            $eq: ["$line", ""],
          },
          then: "\n",
          else: {
            $concat: ["$line", " "],
          },
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      ss: {
        $push: "$s",
      },
    },
  },
  {
    $set: {
      elves: {
        $let: {
          vars: {
            s: {
              $reduce: {
                input: "$ss",
                initialValue: "",
                in: {
                  $concat: ["$$value", "$$this"],
                },
              },
            },
          },
          in: {
            $map: {
              input: { $split: ["$$s", "\n"] },
              as: "elf",
              in: {
                $sum: {
                  $map: {
                    input: {
                      $split: [
                        {
                          $rtrim: {
                            input: "$$elf",
                            chars: " ",
                          },
                        },
                        " ",
                      ],
                    },
                    as: "cal",
                    in: { $toInt: "$$cal" },
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
    $unwind: {
      path: "$elves",
    },
  },
  {
    $group: {
      _id: null,
      res: {
        $topN: {
          output: ["$elves"],
          sortBy: { elves: -1 },
          n: 1, // Part 1
          // n: 3, // Part 2
        },
      },
    },
  },
]