---
layout: post
title:  "Optimizing Tee Sheets at 9-Hole Golf Courses"
subtitle: "Handling 18-Hole bookings for maximum revenue and efficiency"
head_img: '/assets/img/articles/golfball.jpg'
alt_img: 'Online tee time booking'
categories: teesheet optimization 9-holes 18-hole-bookings revenue efficiency
excerpt_separator: <!-- excerpt -->
---

## Introduction

When a golfer at a 9-hole golf course wants to play a full round of 18 holes, they play the 9-hole course twice. A question that often comes up in our meetings with 9-hole golf ourses is how they should handle 18-hole bookings in their tee sheet to maximize revenue and run their course most efficiently. 
<!-- excerpt -->

There are typically two ways that a 9-hole golf course could handle 18-hole bookings:
1.  **The first is to automatically block off a second time slot using the average amount of time to complete 9 holes.** For example, if a golfer books a reservation at 8 AM and the average 9-hole completion time is 2 hours, the golf course would also block off a tee time at 10 AM. 
2. **The second option is to add a buffer between time slots in the tee sheet and allow the golfers who book 18 holes to fill in the space created by the buffer.** For example, instead of spacing tee times 8 minutes apart, the golf course might space them 10 or 12 minutes apart so that groups who play 18 holes can fill in the buffer when they reach the 10th hole. 

Using principles of operations research and queueing theory (with a bit of help from artificial intelligence) we’ve analyzed these two approaches. Below, you’ll find the details of our analysis, which suggests which approach is optimal for both revenue maximization and managing the flow at the golf course efficiently. Warning, this is a fairly long post with lots of details. Feel free to skip down to the Conclusion and Recommendation sections. 

## The Analysis

This is a classic operations research problem involving resource allocation (tee times) under uncertainty (variable playing time). We need to analyze both proposals considering their impact on revenue and efficiency.

#### Let's define some key variables:

- μ: Mean time to complete 9 holes.
- σ: Standard deviation of the time to complete 9 holes.
- t: Standard time interval between tee times for single 9-hole rounds (e.g., 8 minutes).
- b: Buffer time added between tee times in the second proposal (e.g., 2 or 4 minutes).
- R: Revenue per 9-hole round.
- N: Number of available tee times for 9 holes in a given period.
- p: Proportion of golfers who want to play 18 holes.

#### Analyzing Proposal 1: Automatic Blocking

- **Mechanism:** When an 18-hole round is booked at time T, the tee time at T + μ is automatically blocked.
- **Revenue Implications:**
1. **Potential Loss:** If the 18-hole group finishes the first 9 holes in less than μ time, the blocked second tee time remains unused, leading to lost revenue. The probability of finishing early depends on the normal distribution of playing time.
2. **Potential Gain (Indirect):** Simplifies booking management and guarantees availability for the 18-hole group.
- **Efficiency Implications:**
1. **Inefficient Use of Tee Times:** The blocked second slot might be wasted if the first round is faster than average.
2. **Potential for Congestion:** If the first round takes longer than μ, the 18-hole group might delay subsequent tee times, creating bottlenecks. The probability of finishing late also depends on the normal distribution.
3. **Predictability:** This system offers high predictability for the 18-hole group.

#### Quantifying the Issues with Proposal 1:
Let X be the random variable representing the time to complete 9 holes, X∼N(μ,σ2).

- **Probability of wasted blocked slot**: P(X<μ). For a normal distribution, this is approximately 0.5. So, roughly half the time, the blocked slot might be partially or fully wasted.
- **Probability of delay:** P(X>μ+t), where t is the standard tee time interval. This probability depends on σ and t. A higher σ increases the likelihood of delay.

#### Analyzing Proposal 2: Buffer Time

- **Mechanism:** Tee times for all bookings are spaced by t + b. 18-hole groups utilize the buffer time between their first and "second" 9 holes.
- **Revenue Implications:**
1. **Potential Loss:** Fewer total tee times are available in a given period due to the increased spacing. The number of 9-hole equivalent slots reduces from N to approximately N×t+bt​.
2. **Potential Gain:** The buffer allows 18-hole groups to seamlessly transition without blocking an entire separate tee time. This reduces the risk of wasted slots compared to Proposal 1. The buffer also provides some leeway for slightly longer-than-average first rounds.
- **Efficiency Implications:**
1. **More Flexible:** Accommodates the variability in 9-hole completion times better than Proposal 1.
2. **Reduced Risk of Bottlenecks:** The buffer acts as a shock absorber for slightly longer first rounds.
Potentially Lower Throughput: Fewer total rounds can be accommodated in the same period due to the increased spacing.

#### Quantifying the Trade-offs with Proposal 2:

- **Reduction in capacity:** The number of available 9-hole equivalent slots decreases by a factor of t+bt​.
- **Accommodation of variability:** If the first 9 holes take X time, the 18-hole group fits within their "allocated" time if X≤(t+b)×(number of 9-hole slots booked). For a standard 18-hole booking (two consecutive slots), this means X≤2(t+b). This offers more flexibility than Proposal 1, where the second slot is fixed at μ after the start.

#### Using Queueing Theory Principles

While not a strict queuing system in the traditional sense (no waiting line for service in progress), we can apply some concepts:

- **Arrival Rate:** The rate at which golfers book tee times.
- **Service Time:** The time it takes to play 9 holes (variable).
- **System Capacity:** The number of available tee times.

Both proposals impact the effective service rate and the capacity of the "system" (the golf course's ability to accommodate rounds).

- **Proposal 1:** Can lead to idle "servers" (tee times) if the blocked slot is unused. It can also lead to increased "service time" for subsequent groups if the 18-hole group runs late.
- **Proposal 2:** Reduces the overall number of "servers" but aims to improve the utilization of the active servers by accommodating the variability in service time for 18-hole rounds.

#### Determining the Optimal Option

The optimal option depends on several factors:

1. **Variability in Playing Time (σ):** If σ is high, Proposal 1 is more likely to result in wasted blocked slots or delays. Proposal 2's buffer becomes more valuable. If σ is low, Proposal 1 might be more efficient in maximizing the number of booked slots.
2. **Proportion of 18-Hole Bookings (p):** If p is high, the inefficiencies of Proposal 1 (frequent blocking and potential waste) become more significant. Proposal 2 might be more beneficial in streamlining 18-hole play.
3. **Revenue per Round (R):** This is constant for both proposals but will be multiplied by the number of rounds played to determine total revenue.
4. **Cost of Inefficiency:** This is harder to quantify but includes customer dissatisfaction due to delays or the inability to book desired times.

#### Simulation and Modeling

The most robust way to determine the optimal strategy would be through simulation modeling:
1. Generate random 9-hole completion times based on the normal distribution N(μ,σ2).
2. Simulate bookings with a certain proportion p being for 18 holes.
3. Implement Proposal 1: Block the second slot based on μ. Track the number of wasted blocked slots and the number of delayed subsequent tee times.
4. Implement Proposal 2: Use the buffered tee time intervals. Track the total number of rounds accommodated.
5. Calculate revenue for both scenarios based on the number of 9-hole equivalent rounds played.
6. Analyze efficiency by looking at tee time utilization and the frequency of delays.

#### Qualitative Comparison and Recommendations

Without specific numerical values, we can make some qualitative observations:

- **For Revenue Maximization:**
    - If the variability in playing time (σ) is low and the proportion of 18-hole bookings (p) is also low, Proposal 1 might yield slightly higher revenue by maximizing the number of bookable slots. However, this comes with the risk of wasted slots.
    - If σ is high or p is high, Proposal 2 is likely to be better for revenue. While the overall capacity is slightly reduced, the better accommodation of 18-hole rounds and reduced wasted slots can lead to higher overall utilization and thus higher revenue. The buffer also makes the course more attractive to 18-hole players.
- **For Efficiency:**
    - Proposal 2 is generally more efficient in handling the variability of playing times, leading to fewer disruptions and better flow on the course. The buffer acts as a safety margin.
    - Proposal 1 can be inefficient due to wasted blocked slots and potential delays.

### Conclusion

Based on the principles of operations research and queueing theory, **Proposal 2 (adding a buffer) is likely to be the optimal strategy for both revenue maximization and efficiency**, especially when the variability in 9-hole completion times is significant or the proportion of 18-hole bookings is high.

##### Reasons for favoring Proposal 2:

1. **Better Handles Variability:** The buffer directly addresses the uncertainty in playing times, reducing the risk of wasted resources (blocked slots) and disruptions (delays).
2. **Improved Customer Experience:** 18-hole golfers can transition more smoothly, and subsequent tee times are less likely to be affected by overruns.
3. **Potentially Higher Long-Term Revenue:** By offering a more reliable and accommodating system for 18-hole players (a significant revenue source), the course can attract and retain more customers. The reduction in wasted slots also contributes to better revenue.

### Recommendation

9 hole golf courses should consider implementing Proposal 2, not automatically blocking a second tee time, with a carefully chosen buffer time (b). The optimal buffer size would depend on the specific distribution of 9-hole completion times (σ) and the desired level of service. Running a simulation with historical data would be highly beneficial in determining the ideal buffer time. They should analyze the trade-off between the reduced number of total tee times and the improved utilization and customer satisfaction offered by the buffer.

Ready to optimize your 9-hole tee sheet? <a href="https://easyteegolf.com/?utm_source=9hole_article" target="_blank">Explore how Easy Tee Golf can help you implement these strategies</a> and take your course management to the next level.

Also, we've developed a spreadsheet calculator to help you understand the trade-offs of different tee sheet configurations for your 9-hole course. <a href="mailto:admin@easyteegolf.com" target="_blank">Send us an email at admin@easyteegolf.com</a> to request a free copy of the calculator so that you can optimize your 9-hole tee sheet. 