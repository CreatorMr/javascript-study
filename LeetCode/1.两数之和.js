/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const temp = {};
    for(i=0;i<nums.length;i++){
        const currVal = nums[i];
        if(target - currVal in temp) {
            return [temp[target - currVal],i];
        } else {
            temp[currVal] = i;
        }
    }
};

