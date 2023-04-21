import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { customAlphabet } from "nanoid/non-secure";
import {
  personalityTable,
  personalityWeightTable,
} from "../../../personalityTables";
import { db, auth } from "../../../firebaseConfig";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const CreateClassView = ({ route }) => {
  const [className, setClassName] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [capacity, setCapacity] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const { classID } = route.params;

  // const [classIdMessage, setClassIdMessage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your class was created successfully</Text>
      
      <Text />
      <Text />
      <Text />
      <Text>This is your unique class id: </Text>
      <Text>{`${classID}`} </Text>

      <TouchableOpacity
        onPress={() => balanceGroupsAndSaveToFirestore(groupNumber, classID)}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Assign groups </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  textInputError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  box: {
    width: "65%",
    marginTop: 40,
  },
  dropdown: {
    position: "absolute",
    width: "69.6%",
    marginTop: 40,
  },
  input: {
    width: "100%",
  },
  redirectText: {
    width: "60%",
    marginTop: 10,
  },
  passwordError: {
    marginTop: 10,
  },
  button: {
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});

function balanceGroups(nodes, links, numGroups) {
  const graph = new Map(nodes.map((node) => [node, new Set()]));
  links.forEach((link) => {
    graph.get(link.source).add(link.target);
    graph.get(link.target).add(link.source);
  });

  const nodeArray = Array.from(graph.keys());
  const shuffledNodes = nodeArray.sort(() => Math.random() - 0.5); // shuffle the nodes randomly
  const groupSize = Math.floor(nodeArray.length / numGroups);
  const groups = Array.from({ length: numGroups }, () => new Set());

  // assign nodes to groups
  for (let i = 0; i < numGroups; i += 1) {
    for (
      let j = i * groupSize;
      j < (i + 1) * groupSize && j < shuffledNodes.length;
      j += 1
    ) {
      groups[i].add(shuffledNodes[j]);
    }
  }

  let iterations = 0;
  while (iterations < 100) {
    // calculate the number of links between each group and all other groups
    const groupLinkArray = groups.map((group) =>
      Array.from(group)
        .map((node) => [...graph.get(node)])
        .flat()
        .filter((node) => !group.has(node))
        .reduce((linkCount, node) => {
          const nodeGroup = groups.find((group2) => group2.has(node));
          if (!nodeGroup) {
            return linkCount;
          }
          return linkCount + 1;
        }, 0)
    );

    // calculate the average number of links for each group
    const groupLinks = groupLinkArray.reduce((sum, value) => sum + value, 0);
    const averageLinks = groupLinks / numGroups;

    const maxIndex = groupLinkArray.indexOf(Math.max(...groupLinkArray));
    const minIndex = groupLinkArray.indexOf(Math.min(...groupLinkArray));

    // if the difference between the maximum and minimum number of links is less than the average,
    // then the groups are balanced and we can exit the loop
    if (
      groupLinkArray[maxIndex] - averageLinks <
      averageLinks - groupLinkArray[minIndex]
    ) {
      break;
    }

    // move a node from the group with the most links to the group with the fewest links
    const maxNode = Array.from(groups[maxIndex])[
      Math.floor(Math.random() * groups[maxIndex].size)
    ];
    const minNode = Array.from(groups[minIndex])[
      Math.floor(Math.random() * groups[minIndex].size)
    ];
    groups[maxIndex].delete(maxNode);
    groups[minIndex].add(maxNode);

    iterations += 1;
  }

  return groups.map((group) => Array.from(group));
}

async function balanceGroupsAndSaveToFirestore(groupNumber, classID) {
  console.log("hola");
  // assuming you have already initialized the Firebase SDK and authenticated the user
  // get a reference to the "users" collection
  const students = [];
  const querySnapshot = await getDocs(collection(db, "member"));
  querySnapshot.forEach((doc2) => {
    if (doc2.data().classid === classID) {
      students.push(doc2.data().userid);
    }
  });

  // console.log(students);

  const docs = [];
  const ids = [];
  const querySnapshot2 = await getDocs(collection(db, "users"));
  students.forEach((student) => {
    querySnapshot2.forEach((doc2) => {
      if (doc2.id === student) {
        docs.push({
          id: doc2.id,
          personality: doc2.data().personality,
        });
        ids.push(doc2.id);
      }
    });
  });

  const pairs = [];
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      const personality1 = docs.find((doc2) => doc2.id === ids[i]).personality;
      const personality2 = docs.find((doc2) => doc2.id === ids[j]).personality;

      const personality1Index = personalityTable.find(
        (obj) => obj.personality === personality1
      );
      const personality2Index = personalityTable.find(
        (obj) => obj.personality === personality2
      );

      const pweight =
        personalityWeightTable[personality1Index.index][
          personality2Index.index
        ];
      pairs.push({
        source: ids[i],
        target: ids[j],
        weight: pweight,
      });
    }
  }

  console.log(ids);
  console.log(pairs);
  if (groupNumber === "") {
    // eslint-disable-next-line no-param-reassign
    groupNumber = 2;
  }
  const groupsFound = balanceGroups(ids, pairs, groupNumber);

  console.log(groupsFound);
  const groupRef = collection(db, "group");
  const memberRef = collection(db, "member");
  groupsFound.forEach(async (groupMembers, index) => {
    const docRef = await addDoc(groupRef, {
      name: `Team ${index + 1}`,
      fromclass: classID,
    });
    console.log(`Added document with ID: ${docRef.id}`);

    groupMembers.forEach(async (member) => {
      console.log(member);
      const allMembersSnapshot = await getDocs(memberRef);
      allMembersSnapshot.forEach(async (doc2) => {
        console.log(doc2);
        if (doc2.data().userid === member && doc2.data().classid === classID) {
          await updateDoc(doc2.ref, {
            groupid: docRef.id,
          });
        }
      });
    });
  });
}

export default CreateClassView;