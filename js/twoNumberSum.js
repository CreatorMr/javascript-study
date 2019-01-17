var twoSum = function(nums, target) {
    var sum;
    for(i=0;i<nums.length;i++){
        for(j=i+1;j<nums.length;j++){
            if((nums[i]+nums[j]) === target) {
                return [i,j];
            } else {
            	continue;
            }
        }
    }
};
var t = twoSum([3,2,4],
6)

console.log(t)